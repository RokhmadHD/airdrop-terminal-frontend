import { KnowledgeBaseSectionWithGuides } from '@/lib/types';
import Link from 'next/link';
export function GuidesSection({ sections }: {sections: KnowledgeBaseSectionWithGuides[]}) {
    console.log(sections)
    return (
        <div className="py-10 md:py-16">
            <div className="container mx-auto px-4">
                {sections.map((section) => (
                    <div className="mb-16" key={section.id}>
                        <div className="mb-8 border-b border-gray-300 dark:border-gray-700 pb-4">
                            <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">{section.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {section.guides.map((guide) => (
                                <Link href={`/guides-tools/${guide.slug}`} key={guide.id} className="h-full flex flex-col items-center gap-4 bg-light dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-gray-800/10">
                                    <div className="flex gap-4 items-center">
                                        {/* <guide.icon className="w-8 h-8 text-indigo-400 mb-4" /> */}
                                        <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}