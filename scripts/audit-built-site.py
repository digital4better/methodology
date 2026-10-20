"""Check local links, anchors and rendered KaTeX errors in the production build."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, urljoin
import json, sys
root=Path(__file__).resolve().parents[1]/'build'
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__();self.ids=set();self.links=[];self.math_errors=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):self.ids.add(a['id'])
        if tag=='a' and a.get('href'):self.links.append(a['href'])
        if 'katex-error' in a.get('class','').split():self.math_errors.append(a.get('title','KaTeX error'))
pages={p:Page(p.read_text()) for p in root.rglob('*.html')}
issues=[];checked=0
for path,page in pages.items():
    rel=path.relative_to(root).as_posix();url='/methodology/'+rel.removesuffix('index.html')
    for error in page.math_errors:issues.append({'page':rel,'math':error})
    for link in page.links:
        u=urlsplit(urljoin(url,link))
        if u.scheme or u.netloc or not u.path.startswith('/methodology/'):continue
        checked+=1
        target=root/unquote(u.path[len('/methodology/'):])
        if target.is_dir():target=target/'index.html'
        elif not target.suffix and not target.exists():
            target=target.with_suffix('.html') if target.with_suffix('.html').exists() else target/'index.html'
        if not target.exists():issues.append({'page':rel,'missing':link});continue
        if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:issues.append({'page':rel,'anchor':link})
report={'htmlPages':len(pages),'localLinksChecked':checked,'issues':issues}
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(bool(issues))
