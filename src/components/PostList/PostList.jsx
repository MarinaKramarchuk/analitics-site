import { useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.scss";
import { postsData } from "../../projectData";

const getDatesRangeArray = (start, end) => {
  const dates = [];
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    dates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export default function PostList({ dateRange }) {
  const [viewMode, setViewMode] = useState("list");
  const [visibleCount, setVisibleCount] = useState(8);

  const { startDate, endDate } = dateRange || {};

  const filteredPosts = postsData
    .map((post) => {
      if (startDate && endDate) {
        const targetDates = getDatesRangeArray(startDate, endDate);

        let totalLikes = 0;
        let totalComments = 0;
        let hasDataInThisRange = false;

        targetDates.forEach((dateStr) => {
          if (post.history?.[dateStr]) {
            totalLikes += post.history[dateStr].likes || 0;
            totalComments += post.history[dateStr].comments || 0;
            hasDataInThisRange = true;
          }
        });

        return {
          ...post,
          likesOnDate: totalLikes,
          commentsOnDate: totalComments,
          isWithinRange: hasDataInThisRange,
          rangeLabel: `${targetDates[0].split("-").reverse().join("-")} / ${targetDates[targetDates.length - 1].split("-").reverse().join("-")}`,
        };
      }

      return {
        ...post,
        likesOnDate: post.likesToday,
        commentsOnDate: post.commentsToday,
        isWithinRange: true,
        rangeLabel: null,
      };
    })
    .filter((post) => post.isWithinRange);
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const visiblePosts = filteredPosts.slice(0, visibleCount);

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
          <PostCard key={post.id} data={post} date={post.rangeLabel} />
        ))}
      </div>

      {visibleCount < filteredPosts.length && (
        <div className="load-more__container">
          <button className="load-more__btn" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
