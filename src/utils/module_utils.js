const { moduleConfigs } = require('../configs');

const getModuleConfig = (isEnabled, nestedModules) => {
    return isEnabled ? { isEnabled: true, modules: nestedModules || {} } : { isEnabled: false };
};

const configuredModules = {
    organizationManagement: getModuleConfig(moduleConfigs.ORGANIZATION_MODULE, {
        departmentModule: getModuleConfig(moduleConfigs.DEPARTMENT_MODULE),
        roleModule: getModuleConfig(moduleConfigs.ROLE_MODULE),
    }),

    userManagement: getModuleConfig(moduleConfigs.USER_MODULE, {
        userModule: getModuleConfig(moduleConfigs.USER_MODULE),
    }),

    productAndProjectManagement: getModuleConfig(moduleConfigs.PRODUCT_AND_PROJECT_MANAGEMENT, {
        productModule: getModuleConfig(moduleConfigs.PRODUCT_MODULE, {
            productCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.PRODUCT_COMMENT_MODULE)
        }),
        projectModule: getModuleConfig(moduleConfigs.PROJECT_MODULE, {
            projectCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.PROJECT_COMMENT_MODULE)
        }),
        featureModule: getModuleConfig(moduleConfigs.FEATURE_MODULE && (moduleConfigs.PRODUCT_MODULE || moduleConfigs.PROJECT_MODULE), {
            featureCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.FEATURE_COMMENT_MODULE)
        }),
        taskModule: getModuleConfig(moduleConfigs.TASK_MODULE && moduleConfigs.FEATURE_MODULE, {
            taskCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.TASK_COMMENT_MODULE)
        }),
        bugModule: getModuleConfig(moduleConfigs.BUG_MODULE && (moduleConfigs.FEATURE_MODULE || moduleConfigs.TASK_MODULE), {
            bugCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.BUG_COMMENT_MODULE)
        }),
        timesheetModule: getModuleConfig(moduleConfigs.TIMESHEET_MODULE && (moduleConfigs.FEATURE_MODULE || moduleConfigs.TASK_MODULE || moduleConfigs.BUG_MODULE), {
            timesheetCommentModule: getModuleConfig(moduleConfigs.COMMENT_MODULE && moduleConfigs.TIMESHEET_COMMENT_MODULE)
        }),
    }),
};

module.exports = {
    configuredModules
};
