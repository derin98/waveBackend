const userRoles = Object.freeze({
    // SUPER_ADMIN: 'Command Center',
    // ADMIN: 'Chief',
    // PRODUCT_MANAGER: 'Visionary',
    // PROJECT_MANAGER: 'Strategist',
    // HUMAN_RESOURCES: 'Culture Curator',
    // DEVELOPER: 'Artisan',
    // TESTER: 'Detective',
    // INTERN: 'Future Leader'
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    USER: 'User',
})

const userStatus = Object.freeze({
    ACTIVE: 'Active',
    VERIFICATION_PENDING: 'Verification Pending',
    DELETED_DUE_TO_UNVERIFIED : 'Deleted Due To Unverified',
    INACTIVE: 'Inactive',
})

const contactMethods = Object.freeze({
    SMS: 'SMS',
    SMS_AND_WHATS_APP: 'SMS & WhatsApp',
})

const departments = Object.freeze({
    BACKEND: Symbol('Backend'),
    WEB: Symbol('Web Development'),
    GAME: Symbol('Game Development'),
    QUALITY_ASSURANCE: Symbol('Quality Assurance'),
    DATA_SCIENCE: Symbol('Data Science'),
    DATA_ANALYTICS: Symbol('Data Analytics'),
    UI_UX: Symbol('UI/UX'),
    DEVOPS: Symbol('DevOps'),
    ELECTRICAL_AND_INSTRUMENTATION: Symbol('Electrical & Instrumentation'),
    PRODUCT: Symbol('Product'),
    PROJECT: Symbol('Project Management'),
    MODELING: Symbol('Modeling'),
    MARKETING: Symbol('Marketing'),
    ADMINISTRATION: Symbol('Administration'),
    ORGANIZATION: Symbol('Organization'),
});



const designations = Object.freeze({
    [departments.BACKEND]: {
        INTERN: "Aspiring Developer",
        JUNIOR_DEV: "Code Novice",
        MID_LEVEL_DEV: "Code Craftsman",
        SENIOR_DEV: "Code Virtuoso",
        TECH_LEAD: "Code Strategist",
        HOD: "Backend Visionary",
    },
    [departments.WEB]: {
        INTERN: "Aspiring Web Creator",
        JUNIOR_WEB_DEV: "Web Novice",
        MID_LEVEL_WEB_DEV: "Web Craftsman",
        SENIOR_WEB_DEV: "Web Virtuoso",
        TECH_LEAD: "Web Architect",
        HOD: "Web Visionary",
    },
    [departments.GAME]: {
        INTERN: "Aspiring Game Creator",
        JUNIOR_GAME_DEV: "Game Novice",
        MID_LEVEL_GAME_DEV: "Game Craftsman",
        SENIOR_GAME_DEV: "Game Virtuoso",
        TECH_LEAD: "Game Architect",
        HOD: "Game Visionary",
    },
    [departments.QUALITY_ASSURANCE]: {
        INTERN: "Aspiring QA Specialist",
        JUNIOR_QA: "Test Novice",
        MID_LEVEL_QA: "Test Craftsman",
        SENIOR_QA: "Test Virtuoso",
        QA_LEAD: "Quality Architect",
        HOD: "QA Visionary",
    },
    [departments.DATA_SCIENCE]: {
        INTERN: "Aspiring Data Analyst",
        JUNIOR_DATA_SCIENTIST: "Data Novice",
        SENIOR_DATA_SCIENTIST: "Data Virtuoso",
        DATA_ENGINEER: "Data Pipeline Craftsman",
        HOD: "Data Science Visionary",
    },
    [departments.DATA_ANALYTICS]: {
        INTERN: "Aspiring Analyst",
        DATA_ANALYST: "Insight Novice",
        BUSINESS_ANALYST: "Strategy Craftsman",
        ANALYTICS_LEAD: "Analytics Architect",
        HOD: "Analytics Visionary",
    },
    [departments.UI_UX]: {
        INTERN: "Aspiring UI/UX Designer",
        JUNIOR_DESIGNER: "Design Novice",
        SENIOR_DESIGNER: "Design Virtuoso",
        UX_RESEARCHER: "User Experience Advocate",
        HOD: "UI/UX Visionary",
    },
    [departments.DEVOPS]: {
        INTERN: "Aspiring Ops Specialist",
        DEVOPS_ENGINEER: "Ops Novice",
        SENIOR_DEVOPS_ENGINEER: "Ops Virtuoso",
        CLOUD_ENGINEER: "Cloud Craftsman",
        HOD: "DevOps Visionary",
    },
    [departments.ELECTRICAL_AND_INSTRUMENTATION]: {
        INTERN: "Aspiring E&I Engineer",
        ELECTRICAL_AND_INSTRUMENTATION_ENGINEER: "Circuit Novice",
        SENIOR_ELECTRICAL_AND_INSTRUMENTATION_ENGINEER: "Circuit Virtuoso",
        HOD: "E&I Visionary",
    },
    [departments.PRODUCT]: {
        INTERN: "Aspiring Product Manager",
        ASSOCIATE_PRODUCT_MANAGER: "Vision Novice",
        PRODUCT_MANAGER: "Vision Craftsman",
        SENIOR_PRODUCT_MANAGER: "Vision Virtuoso",
        HOD: "Product Visionary",
    },
    [departments.PROJECT]: {
        INTERN: "Aspiring Project Manager",
        ASSISTANT_PROJECT_MANAGER: "Strategy Novice",
        PROJECT_MANAGER: "Strategy Craftsman",
        SENIOR_PROJECT_MANAGER: "Strategy Virtuoso",
        HOD: "Project Visionary",
    },
    [departments.MODELING]: {
        INTERN: "Aspiring Modeler",
        JUNIOR_MODELER: "Model Novice",
        SENIOR_MODELER: "Model Virtuoso",
        MODELING_LEAD: "Model Architect",
        HOD: "Modeling Visionary",
    },
    [departments.MARKETING]: {
        INTERN: "Aspiring Marketing Specialist",
        MARKETING_SPECIALIST: "Brand Novice",
        DIGITAL_MARKETING_MANAGER: "Digital Craftsman",
        SEO_SPECIALIST: "Search Strategist",
        HOD: "Marketing Visionary",
    },
    [departments.ADMINISTRATION]: {
        INTERN: "Aspiring Admin",
        HUMAN_RESOURCE: "Culture Novice",
        OFFICE_MANAGER: "Operations Craftsman",
        ACCOUNTING: "Finance Strategist",
        HOD: "Admin Visionary",
    },
    [departments.ORGANIZATION]: {
        CEO: "Chief Visionary",
        COO: "Chief Operations Strategist",
        CTO: "Chief Technology Architect",
    },
});




module.exports = {
    departments,
    designations,
    userRoles,
    contactMethods,
    userStatus,
}
