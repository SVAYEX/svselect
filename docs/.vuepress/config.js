module.exports = {
    title: 'SVSelect',
    description: 'SVSelect',
    themeConfig: {
        sidebar: {
            '/': [
                {
                    title: 'Getting Started',
                    collapsable: false,
                    children: [
                        ['guide/install', 'Installation'],
                        ['guide/usage', 'Usage'],
                        ['guide/config', 'Configuration']
                    ],
                },
                {
                    title: 'Style',
                    collapsable: false,
                    children: [
                        ['guide/style/variables', 'Variables'],
                        ['guide/style/selectors', 'Classes']
                    ],
                },
                {
                    title: 'API',
                    collapsable: false,
                    children: [
                        ['guide/api/props', 'Props']
                    ],
                },
            ]
        }
    }
}