import React from 'react'
import axios from 'axios'
import { useStoreActions } from 'easy-peasy'
import { format } from 'date-fns'
import { ListGroup, ListGroupItem } from 'reactstrap'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

function SavedModels() {
  const [data, setData] = React.useState([])
  const getModel = useStoreActions(actions => actions.getModel)

  React.useEffect(() => {
    axios({ method: 'get', url: `${API_URL}/api/model/get/all` })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  if (data) {
    return (
      <ListGroup flush>
        {data.map(item => (
          <ListGroupItem
            tag="button"
            action
            onClick={() => getModel(item.id)}
            key={item.id}
          >
            {item.name} -{' '}
            {format(new Date(item.createdAt), 'D MMMM YYYY - hh:mm:ss A')}
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  } else {
    return <div />
  }
}

export default SavedModels
