import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'
_createDemo()

export const mailService = {
  query,
  get,
  remove,
  save,
  addMail,
  changeIsRead,
  getEmptyMail,
  changeIsStared,
  changeIsDeleted
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
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

function changeIsRead(isRead,mailId){
  return get(mailId)
          .then(mail=>{
            mail.isRead=isRead
            return save(mail)
          })
}

function changeIsStared(isStared,mailId){
  return get(mailId)
          .then(mail=>{
            mail.isStared=isStared
            return save(mail)
          })
}

function changeIsDeleted(isDeleted,mailId){
  return get(mailId)
          .then(mail=>{
            mail.isDeleted=isDeleted
            return save(mail)
          })
}

function addMail(newSubject,newBody,newTo,isSent=true,newId=''){
  const newMail = {
    id: newId,
    subject: newSubject,
    body: newBody,
    isRead: true,
    sentAt: isSent ? Date.now():null,
    removedAt: null,
    from: 'user@appsus.com',
    to: newTo,
    isStared:false,
    isDeleted:false
  }
  return save(newMail)
}


function getEmptyMail(){
const emptyMail= {
  // id: utilService.makeId(),
  subject: '',
  body: '',
  isRead: false,
  sentAt: null,
  removedAt: null,
  from:'',
  to: '', 
  isStared:false,
  isDeleted:false
}
  return save(emptyMail)
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
        sentAt: Date.now(),
        removedAt: null,
        from: 'JohnD@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm102',
        subject: 'Madatech - National Museum of Science Technology and Space, Haifa is hiring: Student',
        body: `Dragon Ball Z Pokemon Digimo Bayblades Medabot Teenage Ninja Mutant Turtles X-Men: The Animated Series / X-Men: Evolution/ Wolverine and the X-Men 
        SmurfsMoomins
        Fairly OddParents
        Justice League
        Samurai Jack
        The Adventures of Jimmy Neutron, Boy Genius
        Teen Titans
        Tom and Jerry Tales / The Tom and Jerry Show
        Batman: The Brave and the Bold
        The Powerpuff Girls
        Taz-Mania
        Rugrats
        Animaniacs
        Kim Possible
        Pinky and the Brain
        Dexter's Laboratory 
        Arthur
        SpongeBob SquarePants
        Superman: The Animated Series 
        Southpark
        Simpsons
        Courage the Cowardly Dog
        Ed, Edd n Eddy
        Disney Movies
        Family Guy
        Futurama
        Scooby Doo
        The Magic School Bus
        Yu-Gi-Oh!
        Rick & Morty
        Teletubbies
        
        Didn't watch -
        Adventure Time
        My Little Pony: Friendship Is Magic
        1001 Nights
        Avatar: The Last Airbender/The Legend of Korra
        Phineas and Ferb
        Tiny Toon Adventures 
        Sonice the Hedgehog/Adventures of Sonic the Hedgehog
        DreamWorks Dragons
        Kung Fu Panda: Legends of Awesomeness
        Tangled: Before Ever After 
        Ultimate Spider-Man
        Naruto
        
        Kids -
        Bob the Builder
        Dora the Explorer
        Dragon Ball Z, Pokemon, Digimon, Bayblades, Medabots, Teenage Ninja Mutant Turtles, X-Men: The Animated Series / X-Men: Evolution/ Wolverine and the X-Men, Smurfs, Moomins, Fairly OddParents, Justice League, Samurai Jack, The Adventures of Jimmy Neutron, Boy Genius, Teen Titans, Tom and Jerry Tales / The Tom and Jerry Show, Batman: The Brave and the Bold, The Powerpuff Girls, Taz-Mania, Rugrats, Animaniacs, Kim Possible, Pinky and the Brain, Dexter's Laboratory, Arthur, SpongeBob SquarePants, Superman: The Animated Series, Southpark, Simpsons, Courage the Cowardly Dog, Ed, Edd n Eddy, Disney Movies, Family Guy, Futurama, Scooby Doo, The Magic School Bus, Yu-Gi-Oh!, Rick & Morty, Teletubbies, Adventure Time, My Little Pony: Friendship Is Magic, 1001 Nights, Avatar: The Last Airbender/The Legend of Korra, Phineas and Ferb, Tiny Toon Adventures, Sonice the Hedgehog/Adventures of Sonic the Hedgehog, DreamWorks Dragons, Kung Fu Panda: Legends of Awesomeness, Tangled: Before Ever After, Ultimate Spider-Man, Naruto, Bob the Builder, Dora the Explorer`,
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'LinkedIn@momo.com',
        to: 'user@appsus.com',
        isStared:true,
      },
      {
        id: 'm103',
        subject: 'כנס ליידי טק 9 💪 לעשות את זה נכון!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: 'bogrim@technion-alumni.org.il',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm104',
        subject: 'Your invoice from Apple.',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'Apple@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm105',
        subject: "New Year’s Special! 🎉 Start for just $1 down!",
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: '24-Hour-Fitness@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm106',
        subject: 'Group meeting 5:30 pm!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: 'JohnD@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm107',
        subject: 'Madatech - National Museum of Science Technology and Space, Haifa is hiring: Student',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'LinkedIn@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm108',
        subject: 'כנס ליידי טק 9 💪 לעשות את זה נכון!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: 'bogrim@technion-alumni.org.il',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm109',
        subject: 'Your invoice from Apple.',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'Apple@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm110',
        subject: "New Year’s Special! 🎉 Start for just $1 down!",
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: '24-Hour-Fitness@momo.com',
        to: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm111',
        subject: "New Year’s Special! 🎉 Start for just $1 down!",
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        to: '24-Hour-Fitness@momo.com',
        from: 'user@appsus.com',
        isStared:false,
        isDeleted:false
      },
      {
        id: 'm112',
        subject: 'Madatech - National Museum of Science Technology and Space, Haifa is hiring: Student',
        body: `Dragon Ball Z Pokemon Digimo Bayblades Medabot Teenage Ninja Mutant Turtles X-Men: The Animated Series / X-Men: Evolution/ Wolverine and the X-Men 
        SmurfsMoomins
        Fairly OddParents
        Justice League
        Samurai Jack
        The Adventures of Jimmy Neutron, Boy Genius
        Teen Titans
        Tom and Jerry Tales / The Tom and Jerry Show
        Batman: The Brave and the Bold
        The Powerpuff Girls
        Taz-Mania
        Rugrats
        Animaniacs
        Kim Possible
        Pinky and the Brain
        Dexter's Laboratory 
        Arthur
        SpongeBob SquarePants
        Superman: The Animated Series 
        Southpark
        Simpsons
        Courage the Cowardly Dog
        Ed, Edd n Eddy
        Disney Movies
        Family Guy
        Futurama
        Scooby Doo
        The Magic School Bus
        Yu-Gi-Oh!
        Rick & Morty
        Teletubbies
        
        Didn't watch -
        Adventure Time
        My Little Pony: Friendship Is Magic
        1001 Nights
        Avatar: The Last Airbender/The Legend of Korra
        Phineas and Ferb
        Tiny Toon Adventures 
        Sonice the Hedgehog/Adventures of Sonic the Hedgehog
        DreamWorks Dragons
        Kung Fu Panda: Legends of Awesomeness
        Tangled: Before Ever After 
        Ultimate Spider-Man
        Naruto
        
        Kids -
        Bob the Builder
        Dora the Explorer
        Dragon Ball Z, Pokemon, Digimon, Bayblades, Medabots, Teenage Ninja Mutant Turtles, X-Men: The Animated Series / X-Men: Evolution/ Wolverine and the X-Men, Smurfs, Moomins, Fairly OddParents, Justice League, Samurai Jack, The Adventures of Jimmy Neutron, Boy Genius, Teen Titans, Tom and Jerry Tales / The Tom and Jerry Show, Batman: The Brave and the Bold, The Powerpuff Girls, Taz-Mania, Rugrats, Animaniacs, Kim Possible, Pinky and the Brain, Dexter's Laboratory, Arthur, SpongeBob SquarePants, Superman: The Animated Series, Southpark, Simpsons, Courage the Cowardly Dog, Ed, Edd n Eddy, Disney Movies, Family Guy, Futurama, Scooby Doo, The Magic School Bus, Yu-Gi-Oh!, Rick & Morty, Teletubbies, Adventure Time, My Little Pony: Friendship Is Magic, 1001 Nights, Avatar: The Last Airbender/The Legend of Korra, Phineas and Ferb, Tiny Toon Adventures, Sonice the Hedgehog/Adventures of Sonic the Hedgehog, DreamWorks Dragons, Kung Fu Panda: Legends of Awesomeness, Tangled: Before Ever After, Ultimate Spider-Man, Naruto, Bob the Builder, Dora the Explorer`,
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'LinkedIn@momo.com',
        to: 'user@appsus.com',
        isStared:true,
      },
    ]
    utilService.saveToStorage(MAIL_KEY, mails)
  }
  return mails
}
