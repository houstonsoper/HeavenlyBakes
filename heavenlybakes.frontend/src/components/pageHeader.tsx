export interface PageHeaderProps {
    title : string,
    description: string,
}

export default function PageHeader({title, description} : PageHeaderProps) {
    return (
        <section className="bg-pink-50 py-12">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">{title}</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto pb-6">{description}</p>
        </section>
    )
}
