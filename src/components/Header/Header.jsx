import "./Header.scss";
import { info } from "../../projectData";
import DateFilter from "../DatePicker/DateFilter";

export default function Header({ dateRange, onDateRangeChange }) {
  return (
    <div className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          <img src="/logo_m.webp" alt="site logo" className="header__img" />
        </a>
        <div className="header__wrapper">
          <div className="header__name">
            <h1 className="header__nickname">monblanproject</h1>
            <div className="header__start-date">Start on 17-02-2016</div>
          </div>
          <div className="header__info">
            <p className="header__info-text">
              {" "}
              <b>{info.postsNumber}</b> posts
            </p>
            <p className="header__info-text">
              <b>{info.followers.toLocaleString("en-US")}</b> followers
            </p>
            <p className="header__info-text">
              <b>{info.following}</b> following
            </p>
          </div>
          <div className="header_calendar">
            <DateFilter
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateRangeChange={onDateRangeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
