import { useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.scss";
import { postsData } from "../../projectData";

export default function PostList({ selectedDate }) {
  const [viewMode, setViewMode] = useState("list");

  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const visiblePosts = postsData.slice(0, visibleCount);

  return (
    <div className="posts-container">
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
          title="Grid view"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="6" height="6" />
            <rect x="8" width="6" height="6" />
            <rect x="16" width="6" height="6" />
            <rect y="8" width="6" height="6" />
            <rect y="16" width="6" height="6" />
            <rect x="8" y="8" width="6" height="6" />
            <rect x="8" y="16" width="6" height="6" />
            <rect x="16" y="8" width="6" height="6" />
            <rect x="16" y="16" width="6" height="6" />
          </svg>
        </button>
        <button
          className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
          title="List view"
        >
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="6" height="6" />
            <rect y="8" width="6" height="6" />
            <rect y="16" width="6" height="6" />
            <rect x="9" y="10" width="15" height="2" />
            <rect x="9" y="18" width="15" height="2" />
            <rect x="9" y="2" width="15" height="2" />
          </svg>
        </button>
      </div>

      <div className={`cards-wrapper ${viewMode}`}>
        {visiblePosts.map((post) => (
          <PostCard key={post.id} data={post} date={selectedDate} />
        ))}
      </div>
      {visibleCount < postsData.length && (
        <div className="load-more__container">
          <button className="load-more__btn" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
