import React from 'react';

import Loading from '../components/Loading';

function WithLoading(Component) {
	return function ComponentWithLoadingWrapper({ isLoading, ...props }) {
		if (isLoading) {
			return <Loading />;
		} else {
			return <Component {...props} />;
		}
	};
}

export default WithLoading;
