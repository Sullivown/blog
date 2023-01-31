function getResourceType(req, res, next) {
	// extract resource type
	const url = req.originalUrl;
	if (url.includes('comments')) {
		req.resourceType = 'comment';
	} else if (url.includes('posts')) {
		req.resourceType = 'post';
	} else if (url.includes('users')) {
		req.resourceType = 'user';
	} else {
		req.resourceType = undefined;
	}
	next();
}

module.exports = getResourceType;
