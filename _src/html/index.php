---
title: Boilerplate
body: home
---
{{#extend "base"}}
    {{#content "content"}}
<section class="container test">
    <div class="row around-sm">
        <div class="col-sm-4" >
            <p>Go to <a href="/examples">Examples Page</a></p>
        </div>
    </div>
</section>
    {{/content}}
{{/extend}}