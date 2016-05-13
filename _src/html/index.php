---
title: Boilerplate
body: home
---
{{#extend "base"}}
    {{#content "content"}}
<section class="container-fluid">
    <div class="row between-small around-medium text-center">
        <div class="col-small-4 col-medium-2">
            <div class="box">Left</div>
        </div>
        <div class="col-small-4 col-medium-2">
            <div class="box">Middle</div>
        </div>
        <div class="col-small-12 col-medium-2">
            <div class="box">Top</div>
        </div>
    </div>
</section>
    {{/content}}
{{/extend}}