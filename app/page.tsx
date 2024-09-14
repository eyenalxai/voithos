import { Card, CardContent } from '@/components/ui/card'

export default async function IndexPage() {
  return (
    <Card className="mx-auto mt-12 w-full max-w-sm bg-primary/5">
      <CardContent className="p-6">
        <p className="text-center text-lg font-medium text-primary">
          To continue using this service,
        </p>
        <p className="text-center text-lg font-medium text-primary">
          please reach out to the author
        </p>
      </CardContent>
    </Card>
  )
}
