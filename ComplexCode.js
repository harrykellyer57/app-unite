/*

Filename: ComplexCode.js

Description: This code demonstrates a complex implementation of a social network application. It includes features such as user authentication, profile creation, friend requests, post creation, and comments.

Author: [Your Name]

Date: [Date]

*/

// User Class
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.friends = [];
    this.posts = [];
  }

  addFriend(user) {
    this.friends.push(user);
  }

  createPost(content) {
    const post = new Post(this, content);
    this.posts.push(post);
  }
}

// Post Class
class Post {
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.comments = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

// Comment Class
class Comment {
  constructor(user, content) {
    this.user = user;
    this.content = content;
  }
}

// SocialNetwork Class
class SocialNetwork {
  constructor() {
    this.users = [];
  }

  registerUser(name, email, password) {
    const user = new User(name, email, password);
    this.users.push(user);
    return user;
  }

  login(email, password) {
    const user = this.users.find((user) => user.email === email && user.password === password);
    if (user) {
      console.log(`Welcome, ${user.name}!`);
      return user;
    } else {
      console.log("Invalid email or password.");
    }
  }

  sendFriendRequest(sender, receiver) {
    if (!sender.friends.includes(receiver)) {
      console.log(`${sender.name} sent a friend request to ${receiver.name}.`);

      const request = {
        sender: sender,
        receiver: receiver,
      };

      // Store pending friend requests and handle them later

      return request;
    } else {
      console.log(`${sender.name} and ${receiver.name} are already friends.`);
      return null;
    }
  }

  acceptFriendRequest(request) {
    console.log(`${request.sender.name} accepted ${request.receiver.name}'s friend request.`);
    request.sender.addFriend(request.receiver);
    request.receiver.addFriend(request.sender);
  }

  rejectFriendRequest(request) {
    console.log(`${request.sender.name} rejected ${request.receiver.name}'s friend request.`);
  }
}

// Usage example

const network = new SocialNetwork();

const john = network.registerUser("John", "john@example.com", "password123");
const mike = network.registerUser("Mike", "mike@example.com", "qwerty");

const loginAttempt = network.login("john@example.com", "password123");

if (loginAttempt) {
  const jane = network.registerUser("Jane", "jane@example.com", "asdfgh");

  network.sendFriendRequest(john, jane);

  network.acceptFriendRequest(jane.pendingFriendRequests[0]);

  john.createPost("Hello friends!");
  mike.createPost("How is everyone doing today?");

  jane.posts[0].addComment(new Comment(mike, "I'm doing great!"));
}

console.log(network);