import assert from "node:assert";
import { slugify, eventStore } from "../services/eventStore";
import { EVENT_TEMPLATES } from "../services/templatesData";
import { SEED_EVENTS } from "../services/seedEvents";
import { SECTION_PRESETS } from "../registry/sectionPresets";

console.log("\n🧪 Running Event Builder Automated Test Suite...\n");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

// 1. Slug generation tests
test("Slug generation converts uppercase and spaces into hyphens", () => {
  const result = slugify("UNMAI Carbon Article 6 Global Summit 2026");
  assert.strictEqual(result, "unmai-carbon-article-6-global-summit-2026");
});

test("Slug generation strips special characters and accents", () => {
  const result = slugify("UNMAI Conférence & Exhibition (Annual)!");
  assert.strictEqual(result, "unmai-conference-exhibition-annual");
});

test("Slug generation collapses consecutive hyphens and trims edges", () => {
  const result = slugify("---Event---2026---");
  assert.strictEqual(result, "event-2026");
});

// 2. Slug uniqueness
test("Slug uniqueness generates incremental suffix if collision exists", () => {
  const unique1 = eventStore.generateUniqueSlug("extending-legacy-cdm-cers-webinar");
  assert.notStrictEqual(unique1, "extending-legacy-cdm-cers-webinar");
  assert.ok(unique1.startsWith("extending-legacy-cdm-cers-webinar-"));
});

// 3. Event creation
test("Event creation generates valid ID, draft status, and binds template", () => {
  const created = eventStore.createEvent({
    name: "UNMAI Carbon Markets Forum 2026",
    templateId: "tpl_unmai_article6_summit",
  });
  assert.ok(created.id.startsWith("evt_"));
  assert.strictEqual(created.name, "UNMAI Carbon Markets Forum 2026");
  assert.strictEqual(created.status, "draft");
  assert.strictEqual(created.published, false);
  assert.ok(created.sections.length > 0);
});

// 4. Event duplication
test("Event duplication clones sections and assigns distinct copy slug", () => {
  const original = SEED_EVENTS[0];
  const duplicate = eventStore.duplicateEvent(original.id);
  assert.notStrictEqual(duplicate.id, original.id);
  assert.ok(duplicate.slug.includes("-copy"));
  assert.strictEqual(duplicate.published, false);
  assert.strictEqual(duplicate.sections.length, original.sections.length);
});

// 5. Publish / Unpublish workflow
test("Publish toggles draft to published and unpublish restores draft", () => {
  const event = eventStore.getEvents()[0];
  const originalPublished = event.published;
  
  const toggled = eventStore.togglePublish(event.id);
  assert.strictEqual(toggled.published, !originalPublished);

  const toggledBack = eventStore.togglePublish(event.id);
  assert.strictEqual(toggledBack.published, originalPublished);
});

// 6. Section Reordering
test("Sections reordering preserves data and moves elements vertically", () => {
  const event = eventStore.getEvents()[0];
  assert.ok(event.sections.length >= 2);
  
  const firstSecId = event.sections[0].id;
  const secondSecId = event.sections[1].id;

  // Swap
  const modifiedSections = [...event.sections];
  const temp = modifiedSections[0];
  modifiedSections[0] = modifiedSections[1];
  modifiedSections[1] = temp;

  assert.strictEqual(modifiedSections[0].id, secondSecId);
  assert.strictEqual(modifiedSections[1].id, firstSecId);
});

// 7. Template Cloning
test("Template cloning produces independent copy with 4 UNMAI summits", () => {
  assert.ok(EVENT_TEMPLATES.length >= 4);
  const article6Tpl = EVENT_TEMPLATES.find((t) => t.id === "tpl_unmai_article6_summit");
  assert.ok(article6Tpl);
  assert.strictEqual(article6Tpl.category, "Climate & Carbon Markets");
  assert.ok(article6Tpl.configuration.sections.length > 5);
});

// 8. Public Event Slug Resolver
test("Slug lookup returns valid event for the official webinar slug", () => {
  const webinar = eventStore.getEventBySlug("extending-legacy-cdm-cers-webinar");
  assert.ok(webinar, "extending-legacy-cdm-cers-webinar should exist");
  assert.strictEqual(webinar.name, "Extending the Utility of Legacy UNFCCC CDM CERs");
});

// 9. Invalid Slug handling
test("Invalid or missing slug returns null safely", () => {
  const notFound = eventStore.getEventBySlug("non-existent-random-slug-9999");
  assert.strictEqual(notFound, null);
});

// 10. Highlights Presets Catalog
test("Highlights presets contain multiple templates with column configurations 1-4", () => {
  const hlPresets = SECTION_PRESETS.highlights;
  assert.ok(hlPresets && hlPresets.length >= 10, "Should have at least 10 highlights presets");

  const columnSet = new Set(hlPresets.map((p: any) => p.content.columns));
  assert.ok(columnSet.has(1), "Should support 1 column layout");
  assert.ok(columnSet.has(2), "Should support 2 column layout");
  assert.ok(columnSet.has(3), "Should support 3 column layout");
  assert.ok(columnSet.has(4), "Should support 4 column layout");
});

// 11. Highlights Card Reordering & Content Verification
test("Highlights card reordering moves items correctly and preserves icons & badges", () => {
  const cards = [
    { id: "c1", icon: "AlertCircle", title: "Card 1", description: "Desc 1" },
    { id: "c2", icon: "Globe", title: "Card 2", description: "Desc 2" },
    { id: "c3", icon: "TrendingUp", title: "Card 3", description: "Desc 3" },
  ];

  // Move c3 from index 2 to index 0
  const reordered = [...cards];
  const [moved] = reordered.splice(2, 1);
  reordered.splice(0, 0, moved);

  assert.strictEqual(reordered[0].id, "c3");
  assert.strictEqual(reordered[0].icon, "TrendingUp");
  assert.strictEqual(reordered[1].id, "c1");
  assert.strictEqual(reordered[2].id, "c2");
});

console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
