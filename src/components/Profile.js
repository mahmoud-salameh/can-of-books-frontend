  
import React, { Component } from 'react'
import { withAuth0 } from "@auth0/auth0-react";

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.auth0.user.name,
            userEmail: this.props.auth0.user.email,
            userPicture: this.props.auth0.user.picture
        }
    }
    render() {
        // console.log(this.props.auth0);
        return (
            <div>
                <h2>{this.state.userName}</h2>
                <p>{this.state.userEmail}</p>
                <img src={this.state.userPicture} alt={this.state.userName} />
            </div>
        )
    }
}

export default withAuth0(User)
// import React, { Component } from 'react'
// // import { withAuth0 } from "@auth0/auth0-react";

// import { useAuth0 } from "@auth0/auth0-react";
// const Profile = () => {
//     const { user, isAuthenticated, isLoading } = useAuth0();
  
//     if (isLoading) {
//       return <div>Loading ...</div>;
//     }
  
//     return (
//       isAuthenticated && (
//         <div>
//           <img src={user.picture} alt={user.name} />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>
//       )
//     );
//   };
  
//   export default Profile;
