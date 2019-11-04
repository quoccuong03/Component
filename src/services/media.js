import requestService from './request'

const fetchMedia = ({ page = 1, perPage = 200, sortBy = 'created_at', orderBy = 'desc' }, filter) => {
	const input = {
		order_by: `${sortBy}-${orderBy}`,
		limit: perPage,
		page,
	}
	if(!filter.status){
		filter.status='all'
	}
	return requestService.send({
		method: 'get',
		path: '/media/list/',
		query: { ...input, ...filter }
	})
}

const deleteMedia = (id) => {
	return requestService.send({
		method: 'delete',
		path: `/media/remove/${id}/`
	})
}
const updateMedia = (id, data={}) => {
	return requestService.send({
		method: 'put',
		path: `/media/edit/${id}/`,
		data: data
	})
}

export default {
	fetchMedia,
	deleteMedia,
	updateMedia
}