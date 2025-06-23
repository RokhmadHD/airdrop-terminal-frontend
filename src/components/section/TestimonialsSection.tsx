const testimonials = [
    {
        quote: "Made my first $1k+ airdrop from the Arbitrum guide here. The alpha is 100% real and filtered from all the noise.",
        name: "sybil_hunter_77",
        handle: "@Community Member",
    },
    {
        quote: "I used to spend hours searching on Twitter. This community saves me so much time and helps me avoid scams. A total game-changer.",
        name: "CryptoJane",
        handle: "@Community Member",
    },
    {
        quote: "The tracking tools and timely alerts for snapshots are worth the membership alone. Can't imagine farming without it now.",
        name: "0xChad",
        handle: "@Community Member",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Don&#39;t Just Take Our Word For It
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-light dark:bg-dark/50 transform hover:-translate-y-2 transition-transform">
                            <blockquote className="text-gray-600 dark:text-gray-300 mb-4 italic">
                                “{testimonial.quote}”
                            </blockquote>
                            <footer className="font-semibold">{testimonial.name} <span className="text-indigo-400">{testimonial.handle}</span></footer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}