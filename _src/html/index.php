---
title: Boilerplate
body: home
---
{{#extend "base"}}
    {{#content "content"}}
<section class="container">
    <div class="row">
        <div class="small-6 columns" style="border: solid 1px red">6 columns</div>
        <div class="small-6 columns" style="border: solid 1px red">6 columns</div>
    </div>
    <div class="row">
        <div class="medium-6 large-4 columns" style="border: solid 1px red">12/6/4 columns</div>
        <div class="medium-6 large-8 columns" style="border: solid 1px red">12/6/8 columns</div>
    </div>
</section>
    {{/content}}
{{/extend}}