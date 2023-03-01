import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'
_createDemo()

export const mailService = {
  query,
  get,
  remove,
  save,
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    // if (filterBy.txt) {
    //      const regex = new RegExp(filterBy.title, 'i')
    //      mails = mails.filter(mail => regex.test(mail.title))
    // }
    // if (filterBy.price) {
    //      mails = mails.filter(mail => mail.listPrice.amount >= filterBy.price)
    // }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
  // .then(_setNextPrevmailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function _createDemo() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'm101',
        subject: 'Group meeting 5:30 pm!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'JohnD@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'm102',
        subject: 'Madatech - National Museum of Science Technology and Space, Haifa is hiring: Student',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'LinkedIn@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'm103',
        subject: 'כנס ליידי טק 9 💪 לעשות את זה נכון!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'bogrim@technion-alumni.org.il',
        to: 'user@appsus.com',
      },
      {
        id: 'm104',
        subject: 'Your invoice from Apple.',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'Apple@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'm105',
        subject: "New Year’s Special! 🎉 Start for just $1 down!",
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: '24-Hour-Fitness@momo.com',
        to: 'user@appsus.com',
      },
    ]
    utilService.saveToStorage(MAIL_KEY, mails)
  }
  return mails
}
