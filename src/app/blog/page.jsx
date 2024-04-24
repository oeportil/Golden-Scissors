"use client";
import usePeluqueria from "@/hooks/usePeluqueria";
import EntradasBlog from "../components/EntradasBlog";

const Page = () => {
  const { blog } = usePeluqueria();

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="nosotros my-8 font-bold text-3xl brown">Blog</h2>
      <div className="w-11/12 md:grid md:w-10/12 md:gap-8 md:grid-cols-2 lg:grid-cols-3 content-center">
        {blog.length !== 0 ? (
          blog.map((entrada) => (
            <EntradasBlog key={entrada.id_blog} entrada={entrada} />
          ))
        ) : (
          <div className="my-5 col-start-2 flex justify-center">
            {" "}
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
