"use client";
import React, { useState, useEffect } from "react";
import { getQueries } from "@/actions/ai";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import QueryTable from "@/components/table/query-table";
interface QueryResponse {
  queries: [];
  totalPages: number;
}
export default function Page() {
  const [queries, setQueries] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [perpage, setPerpage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  useEffect(() => {
    if (page === 1 && email) fetchQueries();
  }, [page, email]);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perpage)) as QueryResponse;
      setQueries(res.queries);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page > 1 && email) loadMore();
  }, [page]);
  const loadMore = async () => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perpage)) as QueryResponse;
      setQueries([...queries, ...res.queries]);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (!queries.length) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin mr-2" />
      </div>
    );
  }
  return (
    <div>
      <div>
        <div
          className="p-10 mx-5 mb-5 my-5  rounded-lg bg-gradient-to-r from
bg-slate-200 via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate
700 dark:to-slate-600 flex flex-col justify-center items-center"
        >
          <h1 className="text-xl">History</h1>
          <p className="text-sm text-gray-500">Your previous search retults</p>
        </div>
        <div>
          <div className="p-5 rounded-lg flex flex-col justify-center">
            <QueryTable data={queries} />
          </div>
          <div className="text-center my-5 p-4">
            {page < totalPages && (
              <Button onClick={() => setpage(page + 1)} disabled={loading}>
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Load More"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
