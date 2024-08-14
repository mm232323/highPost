import Header from "@/components/layout/header";
import Avatar from "@/components/profile/Avatar";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function UserProfile({ params }) {
  const response = await fetch(`http://localhost:8080/user/${params.id}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 5 },
  });
  if (!response.ok) redirect("/");
  let { name, posts, choosen_gender, avatar, phone, views, followers } =
    await response.json();
  let name2 = name.split(" ").slice(0, 2);
  name2[1] = name2[1][0];
  name2 = name2.join(" ");
  return (
    <main className="">
      <Header size="large" isAuth={true} id={params.id} />
      <div className="p-[40px] grid grid-rows-1 grid-cols-2">
        <div className="w-[529px] h-[800px] bg-gradient-to-bl from-[#4997B0]/5 to-[#1DB6BF]/5 rounded-[30px]">
          {!avatar && (
            <Image
              src="/Header/man.png"
              width={520}
              height={520}
              alt="avatar man"
              className="w-[293px] h-[293px] rounded-full border-white border-[.5px] relative top-[40px] left-1/2 translate-x-[-50%]"
            />
          )}
          <Avatar id={params.id} />
          <h1 className="text-[45px] font-[469] relative top-[50px] text-center mb-[15px]">
            {choosen_gender == "Male"
              ? "Mr."
              : choosen_gender == "Female"
              ? "Ms."
              : ""}
            {name2}
          </h1>
          <p className="font-[100] text-[28px] left-[40px] relative top-[60px] opacity-80 mb-[15px]">
            Name: {name}
          </p>
          <p className="font-[100] text-[28px] left-[40px] relative top-[60px] opacity-80 mb-[15px]">
            Gender: {choosen_gender}
          </p>
          <p className="font-[100] text-[28px] left-[40px] relative top-[60px] opacity-80 mb-[15px]">
            Phone: {phone}
          </p>
          <p className="font-[100] text-[28px] left-[40px] relative top-[60px] opacity-80 mb-[15px]">
            Views: {views}
          </p>
          <p className="font-[100] text-[28px] left-[40px] relative top-[60px] opacity-80 mb-[15px]">
            Followers: {followers.length}
          </p>
        </div>
        <div className="w-[752px] bg-gradient-to-bl from-[#4997B0]/5 to-[#1DB6BF]/5 rounded-[30px] relative left-[-100px] p-[30px] pl-[40px]">
          <h1 className="text-[45px] font-[469]">Shared Posts</h1>
          {posts.length == 0 && (
            <p className="font-[100] text-[23px] pt-[10px] opacity-60">
              You havn't post any posts
            </p>
          )}
          {posts.length &&
            posts.map((post, idx) => (
              <div
                key={idx}
                className="w-[676px] h-[236px] bg-gradient-to-r from-[#2FB3DD]/10 to-[#357CAF]/10 rounded-[10px] mb-[40px]"
              >
                <div className="relative w-[180px]  h-[180px] left-[30px] top-[18px] overflow-hidden rounded-[10px]">
                  <Image src={post.imgUrl} fill />
                </div>
                <h1 className="relative font-[469] text-[47px] pt-[10px] pl-[240px] top-[-177px]">
                  {post.title}
                </h1>
                <p className="font-[100] text-[18px] relative left-[240px] w-[287px] opacity-70 top-[-177px]">
                  {post.post_text}
                </p>
                <span className="font-[80] opacity-90 mr-[10px] text-[12px] relative pl-[20px] top-[-160px] left-[220px]">
                  Views {post.views}
                </span>
                <span className="font-[80] opacity-90 mr-[10px] text-[12px] relative pl-[20px] top-[-160px] left-[220px]">
                  Comments {post.comments}
                </span>
                <span className="font-[80] opacity-90 mr-[10px] text-[12px] relative pl-[20px] top-[-160px] left-[220px]">
                  Reactions {post.reactions}
                </span>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
