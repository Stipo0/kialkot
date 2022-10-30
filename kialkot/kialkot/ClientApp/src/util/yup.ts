import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Required field!",
  },
  string: {
    url: "Invalid URL!",
    email: "Invalid email address!",
  },
});
