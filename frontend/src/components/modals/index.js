import AddChannel from './AddChannel.jsx'
import DeleteChannel from './DeleteChannel.jsx'
import RenameChannel from './RenameChannel.jsx'

const modals = {
  addingChannel: AddChannel,
  deletingChannel: DeleteChannel,
  renamingChannel: RenameChannel,
}

export default modalName => modals[modalName]
