export default {
    template: `
        <header class="app full app-header">
            <div class="app-header-content">

                <RouterLink to="/" class="animate__animated animate__slideInLeft logo">Miss Books</RouterLink>
                <nav>
                    <RouterLink v-for="({path, title}, idx) in routes" :to="path" :title="title"
                    class="animate__animated animate__zoomIn">{{title}}</RouterLink>
                </nav>
                
            </div>
        </header>
        `,
    data() {
        return {
            routes: [
                { path: '/', title: 'Home' },
                { path: '/book', title: 'BookList' },
                { path: '/book/add', title: 'Add Book' },
                { path: '/about', title: 'About' },
            ]
        }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}