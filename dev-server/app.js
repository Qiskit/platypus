#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const express = require('express');
const deepExtend = require('deep-extend');

const CWD = process.cwd();
const COURSE_PATH = path.join(CWD, '/build/');
const COURSES = yaml.load(fs.readFileSync(CWD + '/curriculum.yaml'), 'utf8');

const SETTINGS = yaml.load(fs.readFileSync(__dirname + '/settings.yaml'), 'utf8');
const CUSTOM_SETTINGS = yaml.load(fs.readFileSync(CWD + '/settings.yaml'), 'utf8');
deepExtend(SETTINGS, CUSTOM_SETTINGS);

const PACKAGE = require(CWD + '/package.json');
SETTINGS.repository = PACKAGE.repository;


// -----------------------------------------------------------------------------
// Course Class

class Course {

  constructor(id, data, locale) {
    this.id = id;
    this.sections = data.sections;
    this.steps = data.steps;
    this.title = data.title;
    this.locale = locale;

    const meta = (COURSES[id] || {});
    this.color = '#' + (meta.color || '#242436');
    this.icon = ('icon' in meta) ? meta.icon : `/resources/${id}/icon.png`;
  }

  readFile(name) {
    try {
      return fs.readFileSync(path.join(COURSE_PATH, this.id, name));
    } catch (e) {
      return undefined;
    }
  }

  getNextLink(sectionId) {
    const sectionIndex = this.sections.findIndex(s => s.id === sectionId);
    return this.sections[sectionIndex + 1];
  }

  getJSON(type) {
    return this.readFile(type + `_${this.locale}.json`);
  }

  getSection(section) {
    return this.sections.find(s => s.id === section);
  }

  getStep(step) {
    return this.steps.find(s => s.id === step);
  }

  getSectionHTML(sectionId) {
    const steps = this.getSection(sectionId).steps;
    return steps.map(s => this.getStep(s)).map(s => s.html).join('');
  }
}

function getCourse(courseId, locale = 'en') {
  const file = path.join(COURSE_PATH, courseId, `data_${locale}.json`);
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return new Course(courseId, data, locale);
}


// -----------------------------------------------------------------------------
// Web Server

const port = process.env.PORT || 5000;
const app = express();

app.set('port', port);
app.set('env', 'development');

app.set('views', __dirname);
app.set('view engine', 'pug');

// Remove cache-bust suffixes.
app.use((req, res, next) => {
  req.url = req.url.replace(/\.([a-z0-9]+)\.(js|css|svg|mp3)/,
      (m, p1, p2) => p1 === 'min' ? `.min.${p2}` : `.${p2}`);
  next();
});

// Static Asset Paths
app.use(express.static(CWD + '/assets'));
app.use(express.static(__dirname + '/assets'));
app.use('/resources', express.static(CWD + '/build'));
app.use('/resources', express.static(CWD + '/content'));

app.get('/', (req, res) => {
  const lang = req.query.hl || 'en';
  res.render('index', {courses: COURSES, settings: SETTINGS, lang, getCourse});
});

app.get('/course/:course', (req, res, next) => {
  const course = getCourse(req.params.course);
  if (!course) return next();
  res.redirect(`/course/${course.id}/${course.sections[0].id}`);
});

app.get('/course/:course/:section', (req, res, next) => {
  const lang = req.query.hl || 'en';
  const dir = ['ar', 'fa', 'iw'].includes(lang) ? 'rtl' : 'ltr';

  const course = getCourse(req.params.course, lang);
  if (!course) return next();

  const section = course.getSection(req.params.section);
  if (!section) return next();

  res.render('course', {course, section, lang, dir, settings: SETTINGS});
});

app.post('/course/:course/ask', (req, res) => {
  res.type('txt').send(JSON.stringify([{content: '[NOT IMPLEMENTED]'}]));
});

app.listen(port, () => console.log('Server listening on port ' + port));
