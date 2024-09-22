if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const { moduleConstants: { modules } } = require("../utils/constants");

// module.exports = {
//     ORGANIZATION_MODULE= process.env.ORGANIZATION_MODULE === "true",
//     DEPARTMENT_MODULE= process.env.DEPARTMENT_MODULE === "true",
//     ROLE_MODULE= process.env.ROLE_MODULE === "true",
//     USER_MODULE= process.env.USER_MODULE === "true",
//     PRODUCT_AND_PROJECT_MANAGEMENT= process.env.PRODUCT_AND_PROJECT_MANAGEMENT === "true",
//     PRODUCT_MODULE= process.env.PRODUCT_MODULE === "true",
//     COMMENT_MODULE= process.env.COMMENT_MODULE === "true",
//     PRODUCT_COMMENT_MODULE= process.env.PRODUCT_COMMENT_MODULE === "true",
//     PROJECT_MODULE= process.env.PROJECT_MODULE === "true",
//     PROJECT_COMMENT_MODULE= process.env.PROJECT_COMMENT_MODULE === "true",
//     FEATURE_MODULE= process.env.FEATURE_MODULE === "true",
//     FEATURE_COMMENT_MODULE= process.env.FEATURE_COMMENT_MODULE === "true",
//     TASK_MODULE= process.env.TASK_MODULE === "true",
//     TASK_COMMENT_MODULE= process.env.TASK_COMMENT_MODULE === "true",
//     BUG_MODULE= process.env.BUG_MODULE === "true",
//     BUG_COMMENT_MODULE= process.env.BUG_COMMENT_MODULE === "true",
//     TIMESHEET_MODULE= process.env.TIMESHEET_MODULE === "true",
//     TIMESHEET_COMMENT_MODULE= process.env.TIMESHEET_COMMENT_MODULE === "true",
// };

module.exports = Object.fromEntries(
    Object.keys(modules).map(key => [
        key,
        process.env[key] === "true"
    ])
);