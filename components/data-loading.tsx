import { Card, CardContent, CardHeader } from "@/components/ui/card";
export default function DataLoading() {
  return (
    <section id='projects' className='section-container'>
      <div className='container mx-auto px-4'>
        <h2 className='section-heading text-center'>Featured Projects</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {[1, 2].map((i) => (
            <Card key={i} className='overflow-hidden animate-pulse'>
              <div className='h-48 md:h-64 bg-muted'></div>
              <CardHeader>
                <div className='h-6 bg-muted rounded'></div>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='h-4 bg-muted rounded'></div>
                  <div className='h-4 bg-muted rounded w-3/4'></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
