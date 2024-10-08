export default {
    customer: {
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
            '/BoycottWrapper',
        ]
    },
    admin: {
        canAccess: [
            '/',
            '/adminaccount',
        ]
    },
    delivery: {
        canAccess: [
            '/',
            '/deliveryOrders',
            '/deliveryOrderDetails',
        ]
    },
    visitor: {
        canAccess: [
            '/',
            '/homePage',
            '/PlansWrapperComponent',
            '/ImpactHeading',
            '/BoycottWrapper',
            '/signPage',
            '/CategroyPage',
        ]
    },
}