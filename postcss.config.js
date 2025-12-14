const path = require('path');

module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-mixins': {
			mixinsDir: path.resolve(__dirname, 'shared/styles/mixins'),
		},
		'postcss-nested': {},
		'postcss-simple-vars': {
			variables: {
				'mobile-min': '375px',
				mobile: '767px',

				'tablet-min': '768px',
				tablet: '1024px',

				'desktop-min': '1025px',
				desktop: '1440px',

				'big-screen': '1441px',
			},
		},
		'postcss-import': {
			path: [path.resolve(__dirname, 'shared/styles')],
		},
	},
};
