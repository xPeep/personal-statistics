const Home = ({ user }) => {
  return (
    <div>
      <h1>USER PROFILE</h1>
      <div>
        <h2>Username: {user.username}</h2>
        <h2>Email: {user.emailAddress}</h2>
      </div>
    </div>
  );
};

export default Home;
