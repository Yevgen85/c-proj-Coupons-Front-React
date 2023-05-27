import "./MainPage.css";
import pic from "../Asserts/Logo/wellcomePic.jpeg";

function MainPage(): JSX.Element {
  return (
    <div className="MainPage">
      <img src={pic} alt="" />
    </div>
  );
}

export default MainPage;
