"use client";
import React, { useState } from "react";
import template from "@/utils/template";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
export default function Page() {
  const [search, setSearch] = useState("");
  const filteredTemplates = template.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div
        className="p-10 mx-2 mb-5  my-2 rounded-lg bg-slate-200 dark:bg
slate-500 flex flex-col justify-center items-center dark:text-black"
      >
        <h1>What would you like to create today?</h1>
        <div className="w-full flex justify-center">
          <div
            className="flex gap-2  items-center p-2 border border-gray
300 dark:border-gray-700 shadow-lg rounded-md bg-transparent my-5 w
[50%]"
          >
            <Search className="text-primary" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full outline-none text-black 
dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 gap-5  px-5">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((item) => (
            <Link
              href={`/dashboard/template/${item.slug}`}
              key={item.slug}
              className="px-5s shadow-md rounded-md border flex flex-col gap-3 
cursor-pointer hover:scale-105 transition-all"
            >
              <Image src={item.icon} alt={item.name} width={50} height={50} />
              <h2 className="font-medium text-lg">{item.name}</h2>
              <p className="text-gray-500 line-clamp-3">{item.desc}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No templates found.</p>
        )}
      </div>
    </div>
  );
}
