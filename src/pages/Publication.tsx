import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { getPublicationById, getNextPublication, getPreviousPublication } from '@/data/publications';
import ReactMarkdown from 'react-markdown';

const Publication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const publication = getPublicationById(Number(id));

  if (!publication) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="FileX" size={64} className="mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-semibold">Публикация не найдена</h1>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к списку
          </Button>
        </div>
      </div>
    );
  }

  const nextPub = getNextPublication(publication.id);
  const prevPub = getPreviousPublication(publication.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              К списку публикаций
            </Button>
            <Link to="/" className="text-xl font-semibold tracking-tight">
              Публикации
            </Link>
          </nav>
        </div>
      </header>

      <article className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                {publication.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {publication.year}
              </span>
              {publication.author && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {publication.author}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-5xl font-semibold leading-tight">
              {publication.title}
            </h1>

            <p className="text-lg text-muted-foreground italic">
              {publication.journal}
            </p>

            {publication.doi && (
              <p className="text-sm text-muted-foreground">
                DOI: {publication.doi}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {publication.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="text-3xl font-semibold mt-12 mb-6 leading-tight">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="text-2xl font-semibold mt-10 mb-4 leading-tight">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="text-xl font-semibold mt-8 mb-3 leading-tight">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-base leading-relaxed mb-6 text-foreground">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-base leading-relaxed text-foreground">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {publication.fullText}
            </ReactMarkdown>
          </div>

          <Separator className="my-12" />

          <div className="grid md:grid-cols-2 gap-4">
            {prevPub ? (
              <Link to={`/publication/${prevPub.id}`}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-4 px-6 group"
                >
                  <Icon
                    name="ChevronLeft"
                    size={20}
                    className="flex-shrink-0 group-hover:-translate-x-1 transition-transform"
                  />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground mb-1">
                      Предыдущая
                    </div>
                    <div className="font-medium line-clamp-2">
                      {prevPub.title}
                    </div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextPub && (
              <Link to={`/publication/${nextPub.id}`}>
                <Button
                  variant="outline"
                  className="w-full justify-end gap-3 h-auto py-4 px-6 group md:ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">
                      Следующая
                    </div>
                    <div className="font-medium line-clamp-2">
                      {nextPub.title}
                    </div>
                  </div>
                  <Icon
                    name="ChevronRight"
                    size={20}
                    className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </article>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Научные публикации. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Publication;
