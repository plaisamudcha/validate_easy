import React, { use, useEffect } from "react";
import { useFetchStore } from "../stores/useFetchStore";
import PostCard from "../components/PostCard";

export default function Post() {
  const post = useFetchStore((state) => state.post);
  const fetch = useFetchStore((state) => state.fetchData);
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <p>Post Page :</p>
      <div className="flex flex-wrap justify-around gap-3">
        {post.map((el) => (
          <PostCard key={el.id} item={el} />
        ))}
      </div>
    </div>
  );
}
