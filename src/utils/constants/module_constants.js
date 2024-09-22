const modules = {
    ORGANIZATION_MODULE: "ORGANIZATION_MODULE",
    DEPARTMENT_MODULE: "DEPARTMENT_MODULE",
    ROLE_MODULE: "ROLE_MODULE",
    USER_MODULE: "USER_MODULE",
    PRODUCT_AND_PROJECT_MANAGEMENT: "PRODUCT_AND_PROJECT_MANAGEMENT",
    PRODUCT_MODULE: "PRODUCT_MODULE",
    COMMENT_MODULE: "COMMENT_MODULE",
    PRODUCT_COMMENT_MODULE: "PRODUCT_COMMENT_MODULE",
    PROJECT_MODULE: "PROJECT_MODULE",
    PROJECT_COMMENT_MODULE: "PROJECT_COMMENT_MODULE",
    FEATURE_MODULE: "FEATURE_MODULE",
    FEATURE_COMMENT_MODULE: "FEATURE_COMMENT_MODULE",
    TASK_MODULE: "TASK_MODULE",
    TASK_COMMENT_MODULE: "TASK_COMMENT_MODULE",
    BUG_MODULE: "BUG_MODULE",
    BUG_COMMENT_MODULE: "BUG_COMMENT_MODULE",
    TIMESHEET_MODULE: "TIMESHEET_MODULE",
    TIMESHEET_COMMENT_MODULE: "TIMESHEET_COMMENT_MODULE",
};

const createBasePermissions = () => ({
    allowedDepartments: [],
    sameDepartmentOnly: true,
    creatorOnly: false,
    crossDepartmentAccess: false,
    fullAccess: false,
    
    
});

const defaultPermissions = {
    superAdmin: {
        create: { isEnabled: true, ...createBasePermissions(), fullAccess: true },
        read: { isEnabled: true, ...createBasePermissions(), fullAccess: true },
        update: { isEnabled: true, ...createBasePermissions(), fullAccess: true },
        delete: { isEnabled: true, ...createBasePermissions(), fullAccess: true }
    },
    admin: {
        create: { isEnabled: true, ...createBasePermissions(), sameDepartmentOnly: false },
        read: { isEnabled: true, ...createBasePermissions(), crossDepartmentAccess: true },
        update: { isEnabled: true, ...createBasePermissions(), sameDepartmentOnly: false },
        delete: { isEnabled: true, ...createBasePermissions(), creatorOnly: false }
    },
    user: {
        create: { isEnabled: true, ...createBasePermissions()},
        read: { isEnabled: true, ...createBasePermissions(), crossDepartmentAccess: false },
        update: { isEnabled: true, ...createBasePermissions()},
        delete: { ...createBasePermissions(), creatorOnly: true }
    }
};

const modulePermissions = {
    [modules.ORGANIZATION_MODULE]: {
        superAdmin: { sendNotification: { fullAccess: true } },
        admin: { sendNotification: { sameDepartmentOnly: true } },
        user: { sendNotification: { sameDepartmentOnly: true } }
    },
    [modules.USER_MODULE]: {
        superAdmin: { resetPassword: { fullAccess: true } },
        admin: { resetPassword: { sameDepartmentOnly: true } },
        user: { resetPassword: { selfOnly: true } }
    },
    [modules.PRODUCT_MODULE]: {
        superAdmin: { fillEntries: { fullAccess: true } },
        admin: { fillEntries: { sameDepartmentOnly: false } },
        user: { fillEntries: { assignedOnly: true } }
    },
    [modules.PROJECT_MODULE]: {
        superAdmin: { assignResources: { fullAccess: true } },
        admin: { assignResources: { sameDepartmentOnly: true } },
        user: { assignResources: { selfOnly: true } }
    },
    [modules.FEATURE_MODULE]: {
        superAdmin: { prioritize: { fullAccess: true } },
        admin: { prioritize: { sameDepartmentOnly: false } },
        user: { prioritize: { assignedOnly: true } }
    },
    [modules.TASK_MODULE]: {
        superAdmin: { assignTask: { fullAccess: true } },
        admin: { assignTask: { sameDepartmentOnly: true } },
        user: { assignTask: { selfOnly: true } }
    },
    [modules.BUG_MODULE]: {
        superAdmin: { changePriority: { fullAccess: true } },
        admin: { changePriority: { sameDepartmentOnly: false } },
        user: { changePriority: { assignedOnly: true } }
    },
    [modules.TIMESHEET_MODULE]: {
        superAdmin: { approveTimesheet: { fullAccess: true } },
        admin: { approveTimesheet: { sameDepartmentOnly: true } },
        user: { approveTimesheet: { selfOnly: true } }
    },
};

module.exports = {
    modules,
    defaultPermissions,
    modulePermissions,
};
