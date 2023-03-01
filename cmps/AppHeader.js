export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
                                <nav>
                    <RouterLink v-for="({path, title}, idx) in routes" :to="path" :title="title"
                    class="animate__animated animate__zoomIn">{{title}}</RouterLink>
                </nav>
        </header>
    `,
    data() {
        return {
            routes: [
                { path: '/', title: 'Home' },
                { path: '/email', title: 'EmailIndex' },
                { path: '/note', title: 'NoteIndex' },
                { path: '/about', title: 'About' },
            ]
        }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    },
}
