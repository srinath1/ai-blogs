"use client";
import { runAi, saveQuery } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Template } from "@/utils/types";
import { useUsage } from "@/context/usage";
const Page = ({ params }: { params: { slug: string } }) => {
  const [query, setQuery] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const t = template.find((item) => item.slug === params.slug) as Template;

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const { fetchUsage, subscribed, count } = useUsage();

  const editorRef = useRef<any>(null);
  useEffect(() => {
    if (content) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);
      await saveQuery(t, email, query, data);
      fetchUsage();
    } catch (error) {
      setContent("An error ocurred,pls try again");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current.getInstance();
    const c = editorInstance.getMarkdown();
    try {
      await navigator.clipboard.writeText(c);
      toast.success("Content copied successfully");
    } catch (error) {
      toast.error("An error ocurred,during copying");
    }
  };
  return (
    <>
      <div className="flex justify-between mx-5">
        <Link href="/dashboard">
          <Button className="my-2">
            <ArrowLeft /> <span className="ml-2 my-2">back</span>
          </Button>
        </Link>
        <Button onClick={handleCopy} className="mt-2">
          <Copy /> <span className="ml-2">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 my-4">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-700">{t.desc}</p>
          </div>
          <form className=" mt-6" onSubmit={handleSubmit}>
            {t.form.map((item) => {
              return (
                <div className=" my-2 flex flex-col gap-2 mb-7">
                  <label className="font-bold pb-5">{item.label}</label>
                  {item.field === "input" ? (
                    <Input
                      name={item.name}
                      required={item.required}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  ) : (
                    <Textarea
                      name={item.name}
                      required={item.required}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  )}
                </div>
              );
            })}
            <Button
              type="submit"
              className="w-full py-6 "
              disabled={
                loading ||
                (!subscribed &&
                  count >= Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE))
              }
            >
              {loading && <Loader2Icon className="animate-spin mr-2" />}
              {subscribed ||
              count < Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
                ? " Generate Content"
                : " Subscribe to Generate Content"}
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialvalue="Generated content will appear here"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortCut={true}
            // onChange={()=>editorRef.current.getInstance().getMarkdown()}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
