import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <article className="container mx-auto py-16 max-w-4xl">
            <header className="mb-8">
                <Skeleton className="w-full h-[400px] mb-8" />
                <Skeleton className="h-12 w-2/3 mb-4" />
                <Skeleton className="h-4 w-32" />
            </header>
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </article>
    );
}