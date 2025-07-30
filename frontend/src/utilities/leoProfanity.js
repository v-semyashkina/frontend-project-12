import leoProfanity from 'leo-profanity'

leoProfanity.clearList()

leoProfanity.add(leoProfanity.getDictionary('en'))
leoProfanity.add(leoProfanity.getDictionary('fr'))
leoProfanity.add(leoProfanity.getDictionary('ru'))

export default leoProfanity
