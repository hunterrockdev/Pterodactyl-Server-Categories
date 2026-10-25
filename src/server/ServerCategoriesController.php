<?php

declare(strict_types=1);

namespace Hunterrock\ServerCategories;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Pterodactyl\Services\Extensions\ExtensionRepository;
use Pterodactyl\Services\Extensions\ExtensionSettings;

class ServerCategoriesController extends Controller
{
    private function settings(): ExtensionSettings
    {
        return app(ExtensionRepository::class)->settings('server-categories');
    }

    /**
     * Returns global categories and assignments for all authenticated users.
     */
    public function getData(): JsonResponse
    {
        $settings = $this->settings();
        $categories = $settings->get('categories', []);
        $assignments = $settings->get('assignments', []);

        return response()->json([
            'data' => [
                'categories' => is_array($categories) ? $categories : [],
                'assignments' => is_array($assignments) ? $assignments : new \stdClass(),
            ],
        ]);
    }

    /**
     * Updates global categories (admin only).
     */
    public function saveCategories(Request $request): JsonResponse
    {
        $categories = $request->input('categories', []);
        if (!is_array($categories)) {
            return response()->json(['error' => 'Categories must be an array'], 422);
        }

        $this->settings()->set('categories', $categories);

        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }

    /**
     * Updates global server-to-category assignments (admin only).
     */
    public function saveAssignments(Request $request): JsonResponse
    {
        $assignments = $request->input('assignments', []);
        if (!is_array($assignments)) {
            return response()->json(['error' => 'Assignments must be an array or object'], 422);
        }

        $this->settings()->set('assignments', $assignments);

        return response()->json([
            'success' => true,
            'assignments' => $assignments,
        ]);
    }

    /**
     * Resets global categories and assignments to empty default panel state (admin only).
     */
    public function reset(): JsonResponse
    {
        $this->settings()->set('categories', []);
        $this->settings()->set('assignments', []);

        return response()->json(['success' => true]);
    }
}
