import React from 'react'
import { shallow } from 'enzyme'
import { useNotifications, INotification } from './notifications'

describe('notifications', () => {
  test('should store notifications globally', () => {
    let senderNotifications: INotification[] = []
    let receiverNotifications: INotification[] = []
    let senderAddNotification: (notification: INotification, timeout?: number | undefined) => void = () => {}

    function SenderComponent() {
      const { notifications, addNotification } = useNotifications()

      senderNotifications = notifications
      senderAddNotification = addNotification

      return <div />
    }
    function ReceiverComponent() {
      const { notifications } = useNotifications()

      receiverNotifications = notifications

      return <div />
    }

    shallow(<SenderComponent />)
    shallow(<ReceiverComponent />)

    expect(senderNotifications).toEqual([])
    expect(receiverNotifications).toEqual([])

    senderAddNotification({ type: 'success', message: 'success test' })

    expect(senderNotifications).toEqual([{ type: 'success', message: 'success test' }])
    expect(receiverNotifications).toEqual([{ type: 'success', message: 'success test' }])
  })
})
