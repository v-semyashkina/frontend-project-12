import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { setActiveChannel, selectActiveChannel } from '../slices/channelsSlice.js'
import { openModal } from '../slices/modalsSlice.js'

const Channel = ({ channel }) => {
  const { id, name, removable } = channel

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const activeChannelId = useSelector(selectActiveChannel).id
  const channelUnremovableClass = cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': id === activeChannelId,
  })
  const channelRemovableClass = cn('w-100 rounded-0 text-start text-truncate btn', {
    'btn-secondary': id === activeChannelId,
  })

  const renderUnremovable = () => {
    return (
      <button
        type="button"
        className={channelUnremovableClass}
        onClick={() => dispatch(setActiveChannel(channel))}
      >
        <span className="me-1">#</span>
        {name}
      </button>
    )
  }

  const renderRemovable = () => {
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant="none"
          className={channelRemovableClass}
          onClick={() => dispatch(setActiveChannel(channel))}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        <Dropdown.Toggle
          variant={id === activeChannelId
            ? 'secondary'
            : 'none'}
          split
          id="dropdown-split-basic"
        >
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'deletingChannel', item: channel }))}
          >
            {t('manageChannelsBtns.delete')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'renamingChannel', item: channel }))}
          >
            {t('manageChannelsBtns.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return (<li className="nav-item w-100">
    {removable
      ? renderRemovable()
      : renderUnremovable()}
          </li>)
}

export default Channel
