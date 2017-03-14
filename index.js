#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var commander = require('commander');
var fs = require('fs-extra');
var path = require('path');
var execSync = require('child_process').execSync;
var spawn = require('cross-spawn');


var componentName;
var program = commander
	.version(require('./package.json').version)
	.arguments('<component-name>')
	.usage(chalk.green('<component-name>') + ' [options]')
	.action(function (name) {
		componentName = name;
	})
	.option('-b, --base-path <base-path>', 'create the component within this directory', '')
	.option('-s, --scope <scope>', 'add a scope to the package name', '')
	.option('-t, --template-path <template-path>', 'use your own template directory', path.resolve(__dirname, 'template'))
	.parse(process.argv);

validateComponentName(componentName);
validateTemplatePath(program.templatePath);
createComponent(componentName, program.basePath, program.templatePath, program.scope);

function createComponent(name, basePath, templatePath, scope) {
	var componentPath = path.resolve(basePath, name);
	var scopedComponentName = scope
		?  '@' + scope + '/' + name
		: name;

	console.log('');
	console.log(chalk.bold('Creating a new React component in ') + chalk.green(componentPath) + '.');
	console.log('');

	createBasePath(basePath);
	copyTemplate(templatePath, componentPath);
	renameComponent(scopedComponentName, componentPath, scope);
	installDependencies(componentPath);

	console.log('');
	console.log(chalk.bold('Successfully created ') + chalk.green(scopedComponentName) + '.');
	console.log('');
	console.log('You might want to edit the component now:');
	console.log('');
	console.log('  ' + chalk.cyan('editor ') + componentPath);
	console.log('');
	console.log('Happy hacking!');
	console.log('');
}

function validateComponentName(name) {
	if (typeof name === 'undefined') {
		console.error('Please specify the component name:');
		console.error('  ' + chalk.cyan(program.name()) + chalk.green(' <component-name>'));
		console.error();
		console.error('For example:');
		console.error('  ' + chalk.cyan(program.name()) + chalk.green(' my-react-component'));
		console.error();
		console.error('Run ' + chalk.cyan(program.name() + ' --help') + ' to see all options.');
		process.exit(1);
	}
}

function validateTemplatePath(templatePath) {
	try {
		var packageJsonFile = path.resolve(templatePath, 'package.json');
		JSON.parse(fs.readFileSync(packageJsonFile));
	} catch (e) {
		console.error('Please specify the template path and make sure the directory contains a valid package.json file:');
		console.error('  ' + chalk.cyan(program.name()) + ' <component-name>' + chalk.green(' --template-path <template-path>'));
		console.error();
		console.error('For example:');
		console.error('  ' + chalk.cyan(program.name()) + ' my-react-component' + chalk.green(' --template-path my/template/directory'));
		console.error();
		console.error('Run ' + chalk.cyan(program.name() + ' --help') + ' to see all options.');
		process.exit(1);
	}
}

function createBasePath(basePath) {
	fs.ensureDirSync(basePath);
}

function copyTemplate(templatePath, componentPath) {
	fs.copySync(templatePath, componentPath);
}

function renameComponent(name, componentPath, scope) {
	var packageJsonFile = path.resolve(componentPath, 'package.json');

	var packageJson = JSON.parse(fs.readFileSync(packageJsonFile));

	packageJson.name = name;

	fs.writeFileSync(
		packageJsonFile,
		JSON.stringify(packageJson, null, 2)
	);
}

function installDependencies(componentPath) {
	var originalPath = process.cwd();
	process.chdir(componentPath);

	var cmd = 'npm';
	var args = ['install'];
	if (hasYarn()) {
		cmd = 'yarn';
		args = [];
	}

	spawn.sync(cmd, args, { stdio: 'inherit' });

	process.chdir(originalPath);
}

function hasYarn() {
	try {
		execSync('yarn --version', { stdio: 'ignore' });
		return true;
	} catch (e) {
		return false;
	}
}
