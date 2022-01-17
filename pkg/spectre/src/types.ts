export type SnftEvent = [
  metadata: [category: string, url: string],
  description: string
]

export type Snft = {
  id: string
  image: string
  title: string
  description: string
  token: { name: string; distribution: number[] }
  creator: { address: string; name: string; url: string }
  authenticity: { name: string; url: string }[]
  history: { date: string; event: SnftEvent }[]
}
