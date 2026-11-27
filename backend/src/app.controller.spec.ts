import { describe, it, expect, beforeEach } from 'vitest';
import { AppController } from './app.controller.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('health', () => {
    it('devrait retourner un statut ok et le nom du service', () => {
      const result = appController.health();
      expect(result.status).toBe('ok');
      expect(result.service).toBe('api running');
      expect(result.timestamp).toBeDefined();
    });
  });
});
