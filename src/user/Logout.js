import { ACCESS_TOKEN } from "../constants";

export default function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  return (
    <section className="content">
      <div className="error-page">
        <h3 className="headline text-success"> Unauthenticated</h3>
        <div className="text-center">
          <h3>Hey! You are safely logged out!</h3>
          <h3>
            You may <a href="/">go to login</a>
          </h3>
        </div>
      </div>
    </section>
  );
}
