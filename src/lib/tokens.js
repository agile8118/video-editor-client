const t = {
  /** For error messages.
   * Messages are divided into 3 different sections for both error and success messages:
   *  - auth (anything related to authentication)
   *  - video (anything related to video)
   *  - user (anything related to users)
   */
  alert: {
    // For error messages
    error: {
      auth: {
        badLoginInfo: "Username or password is incorrect.",
      },
      video: {},
      user: {},
      default: "Sorry an unexpected error occurred. Please try again later.",
    },
    // For success error messages
    success: {
      auth: {
        loggedOut: "You were successfully logged out!",
        loggedIn: "You were successfully logged in!",
      },
      video: {
        audioExtracted:
          "The audio was extracted successfully! You can now download the audio file.",
      },
      user: {
        updated: "Your info was updated successfully!",
      },
    },
  },
};

export default t;
