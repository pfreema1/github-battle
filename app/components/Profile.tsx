import * as React from "react";

interface ProfileProps {
  profile: object;
}

interface ProfileObj {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  company: string;
  followers: string;
  following: string;
  public_repos: string;
  html_url: string;
}

function Profile(props: ProfileProps) {
  return (
    <div className="profile-text">
      {(props.profile as ProfileObj).name}
      <br />
      {(props.profile as ProfileObj).location}
      <br />
      {(props.profile as ProfileObj).company}
      <br />
      Followers: {(props.profile as ProfileObj).followers}
      <br />
      Following: {(props.profile as ProfileObj).following}
      <br />
      Public Repos: {(props.profile as ProfileObj).public_repos}
      <br />
      <a href={(props.profile as ProfileObj).html_url}>github link</a>
    </div>
  );
}

export default Profile;
