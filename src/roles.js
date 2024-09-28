export default {
    user: {
        canAccess: [
            '/',
            '/homePage',
            '/productsPage/:id',
            '/cart',
            '/offersPage',
            '/CategroyPage',
            '/productsPage',
            '/productdetail/:id',
            '/EmailGetHelp',
            '/useraccount',
            '/PlansWrapperComponent',
            '/ImpactHeading',
        ]
    },
    admin: {
        canAccess: [
            '/adminaccount',
        ]
    },
    delivery: {
        canAccess: []
    },
}