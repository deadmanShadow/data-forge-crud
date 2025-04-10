import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">Software Engineering</div>
        <div>
          Software engineering is the discipline of designing, developing,
          testing, and maintaining software systems that are reliable, scalable,
          and efficient. It combines principles from computer science,
          engineering, and project management to build robust applications for
          real-world problems.
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <Link
            className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest "
            href={"/edit"}
          >
            Edit
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
